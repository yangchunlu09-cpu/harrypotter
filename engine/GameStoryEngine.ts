import type { 
  Scene, 
  LogicGate, 
  PlotLockResult, 
  BranchOption, 
  BranchEffect,
  KnowledgeEntry,
  Condition
} from '@/types/gameLogic';
import { 
  ALL_SCENES, 
  LOGIC_GATES, 
  getSceneById, 
  CHOCOLATE_FROG_CARDS 
} from '@/data/storyEngine';

export class GameStoryEngine {
  private plotFlags: Record<string, boolean>;
  private knowledgeGraph: Record<string, KnowledgeEntry>;
  private inventory: Set<string>;
  private bonds: Record<string, number>;
  private completedChapters: Set<string>;
  private milestones: Set<string>;

  constructor() {
    this.plotFlags = {};
    this.knowledgeGraph = {};
    this.inventory = new Set();
    this.bonds = {};
    this.completedChapters = new Set();
    this.milestones = new Set();
  }

  initFromState(state: {
    plotFlags?: Record<string, boolean>;
    knowledgeGraph?: Record<string, KnowledgeEntry>;
    inventory?: string[];
    bonds?: Record<string, number>;
    completedChapters?: string[];
    milestones?: string[];
  }) {
    if (state.plotFlags) this.plotFlags = { ...state.plotFlags };
    if (state.knowledgeGraph) this.knowledgeGraph = { ...state.knowledgeGraph };
    if (state.inventory) this.inventory = new Set(state.inventory);
    if (state.bonds) this.bonds = { ...state.bonds };
    if (state.completedChapters) this.completedChapters = new Set(state.completedChapters);
    if (state.milestones) this.milestones = new Set(state.milestones);
  }

  getPlotFlags(): Record<string, boolean> {
    return { ...this.plotFlags };
  }

  setPlotFlag(flag: string, value: boolean): void {
    this.plotFlags[flag] = value;
  }

  getPlotFlag(flag: string): boolean {
    return this.plotFlags[flag] ?? false;
  }

  getKnowledgeGraph(): Record<string, KnowledgeEntry> {
    return { ...this.knowledgeGraph };
  }

  addKnowledge(key: string, entry: KnowledgeEntry): void {
    this.knowledgeGraph[key] = {
      ...entry,
      revealedAt: { day: 1, hour: 9 }
    };
  }

  hasKnowledge(key: string): boolean {
    return key in this.knowledgeGraph;
  }

  getKnowledge(key: string): KnowledgeEntry | undefined {
    return this.knowledgeGraph[key];
  }

  checkPlotRequirement(
    requirement: {
      type: 'flag' | 'item' | 'bond' | 'chapter' | 'milestone' | 'knowledge';
      target: string;
      operator?: string;
      value?: number | boolean | string;
    }
  ): PlotLockResult {
    const missingRequirements: string[] = [];
    const failedConditions: string[] = [];

    switch (requirement.type) {
      case 'flag':
        if (!this.plotFlags[requirement.target]) {
          missingRequirements.push(`需要剧情标志: ${requirement.target}`);
        }
        break;

      case 'item':
        if (!this.inventory.has(requirement.target)) {
          missingRequirements.push(`需要物品: ${requirement.target}`);
        }
        break;

      case 'bond':
        const bondValue = this.bonds[requirement.target] ?? 0;
        if (requirement.operator === '>=') {
          if (bondValue < (requirement.value as number)) {
            failedConditions.push(
              `需要与 ${requirement.target} 的羁绊等级 >= ${requirement.value}，当前: ${bondValue}`
            );
          }
        }
        break;

      case 'chapter':
        if (!this.completedChapters.has(requirement.target)) {
          missingRequirements.push(`需要完成章节: ${requirement.target}`);
        }
        break;

      case 'milestone':
        if (!this.milestones.has(requirement.target)) {
          missingRequirements.push(`需要完成里程碑: ${requirement.target}`);
        }
        break;

      case 'knowledge':
        if (!this.hasKnowledge(requirement.target)) {
          missingRequirements.push(`需要知识: ${requirement.target}`);
        }
        break;
    }

    return {
      isUnlocked: missingRequirements.length === 0 && failedConditions.length === 0,
      missingRequirements,
      failedConditions
    };
  }

  evaluateConditions(conditions: Condition[]): PlotLockResult {
    const allMissing: string[] = [];
    const allFailed: string[] = [];

    for (const condition of conditions) {
      const result = this.evaluateCondition(condition);
      if (!result.pass) {
        if (result.missing) {
          allMissing.push(result.missing);
        } else {
          allFailed.push(result.failed ?? '');
        }
      }
    }

    return {
      isUnlocked: allMissing.length === 0 && allFailed.length === 0,
      missingRequirements: allMissing,
      failedConditions: allFailed
    };
  }

  private evaluateCondition(condition: Condition): { pass: boolean; missing?: string; failed?: string } {
    switch (condition.type) {
      case 'has_item':
        return this.inventory.has(condition.target)
          ? { pass: true }
          : { pass: false, missing: `需要物品: ${condition.target}` };

      case 'milestone_completed':
        return this.milestones.has(condition.target)
          ? { pass: true }
          : { pass: false, missing: `需要里程碑: ${condition.target}` };

      case 'bond_level': {
        const bondValue = this.bonds[condition.target] ?? 0;
        const required = condition.value as number;
        const pass = this.compareValues(bondValue, condition.operator, required);
        return pass
          ? { pass: true }
          : { pass: false, failed: `羁绊 ${condition.target} 需要 ${condition.operator} ${required}，当前 ${bondValue}` };
      }

      case 'chapter_completed':
        return this.completedChapters.has(condition.target)
          ? { pass: true }
          : { pass: false, missing: `需要完成章节: ${condition.target}` };

      case 'house_points': {
        return { pass: true };
      }

      case 'time_of_day': {
        return { pass: true };
      }

      default:
        return { pass: false, failed: `未知条件类型: ${condition.type}` };
    }
  }

  private compareValues(actual: number, operator: string, expected: number): boolean {
    switch (operator) {
      case '==': return actual === expected;
      case '!=': return actual !== expected;
      case '>': return actual > expected;
      case '>=': return actual >= expected;
      case '<': return actual < expected;
      case '<=': return actual <= expected;
      default: return false;
    }
  }

  checkLogicGate(gateId: string): PlotLockResult {
    const gate = LOGIC_GATES.find(g => g.id === gateId);
    if (!gate) {
      return {
        isUnlocked: false,
        missingRequirements: [`找不到逻辑门: ${gateId}`],
        failedConditions: []
      };
    }

    const result = this.evaluateConditions(gate.conditions);
    return result;
  }

  executeLogicGate(gateId: string): { success: boolean; result: string; effects: BranchEffect[] } {
    const gate = LOGIC_GATES.find(g => g.id === gateId);
    if (!gate) {
      return { success: false, result: `找不到逻辑门: ${gateId}`, effects: [] };
    }

    const checkResult = this.evaluateConditions(gate.conditions);
    
    if (checkResult.isUnlocked) {
      if (gate.onPass.type === 'triggerScene') {
        return { success: true, result: `逻辑门通过，触发场景: ${gate.onPass.target}`, effects: [] };
      } else if (gate.onPass.type === 'setFlag') {
        this.setPlotFlag(gate.onPass.target, true);
        return { success: true, result: `逻辑门通过，设置标志: ${gate.onPass.target}`, effects: [] };
      }
    } else {
      if (gate.onFail.type === 'triggerScene') {
        return { success: false, result: `逻辑门失败，触发场景: ${gate.onFail.target}`, effects: [] };
      } else if (gate.onFail.type === 'showMessage') {
        return { success: false, result: gate.onFail.message, effects: [] };
      }
    }

    return { success: false, result: '逻辑门执行完成', effects: [] };
  }

  getAvailableBranches(sceneId: string): BranchOption[] {
    const scene = getSceneById(sceneId);
    if (!scene) return [];

    return scene.branchOptions.filter(branch => {
      if (branch.isHidden) return false;

      if (branch.requiredFlags) {
        for (const flag of branch.requiredFlags) {
          if (!this.getPlotFlag(flag)) return false;
        }
      }

      if (branch.requiredItems) {
        for (const item of branch.requiredItems) {
          if (!this.inventory.has(item)) return false;
        }
      }

      if (branch.requiredBondLevel) {
        for (const [charId, minValue] of Object.entries(branch.requiredBondLevel)) {
          const bondValue = this.bonds[charId] ?? 0;
          if (bondValue < minValue) return false;
        }
      }

      return true;
    });
  }

  executeBranchEffects(effects: BranchEffect[]): void {
    for (const effect of effects) {
      switch (effect.type) {
        case 'setFlag':
          if (effect.target && effect.value !== undefined) {
            this.setPlotFlag(effect.target, effect.value as boolean);
          }
          break;

        case 'unsetFlag':
          if (effect.target) {
            this.setPlotFlag(effect.target, false);
          }
          break;

        case 'addItem':
          if (effect.target) {
            this.inventory.add(effect.target);
          }
          break;

        case 'removeItem':
          if (effect.target) {
            this.inventory.delete(effect.target);
          }
          break;

        case 'updateBond':
          if (effect.characterId && effect.value !== undefined) {
            const current = this.bonds[effect.characterId] ?? 0;
            this.bonds[effect.characterId] = current + (effect.value as number);
          }
          break;

        case 'addKnowledge':
          if (effect.target && effect.value === true) {
            const existing = CHOCOLATE_FROG_CARDS.find(c => c.knowledgeKey === effect.target);
            if (existing) {
              this.addKnowledge(effect.target, {
                key: effect.target,
                name: existing.name,
                description: existing.description,
                sourceItem: existing.id,
                relatedCharacters: []
              });
            }
          }
          break;

        case 'gainHousePoints':
          break;

        case 'loseHousePoints':
          break;

        case 'triggerScene':
          break;

        case 'lockBranch':
          break;
      }
    }
  }

  processChocolateFrogCard(cardId: string): KnowledgeEntry | null {
    const card = CHOCOLATE_FROG_CARDS.find(c => c.id === cardId);
    if (!card || !card.knowledgeKey) return null;

    this.addKnowledge(card.knowledgeKey, {
      key: card.knowledgeKey,
      name: card.name,
      description: card.description,
      sourceItem: card.id,
      isSecret: true
    });

    return this.knowledgeGraph[card.knowledgeKey];
  }

  canTriggerHiddenDialogue(dialogueKey: string): boolean {
    if (dialogueKey === 'snape_philosophers_stone') {
      return this.hasKnowledge('Nicolas Flamel');
    }
    if (dialogueKey === 'library_restricted_section') {
      return this.hasKnowledge('Nicolas Flamel') && this.getPlotFlag('hermione_trust_gained');
    }
    return false;
  }

  getHermioneRescueOutcome(): 'success' | 'tragedy' {
    const metHermione = this.getPlotFlag('metHermione');
    const hermioneTrust = this.bonds['hermione'] ?? 0;

    if (metHermione && hermioneTrust >= 10) {
      return 'success';
    }
    return 'tragedy';
  }

  validateSortingChoice(wasAggressiveToDraco: boolean): { isHardMode: boolean; mustPassMinigame: boolean } {
    if (wasAggressiveToDraco) {
      return { isHardMode: true, mustPassMinigame: true };
    }
    return { isHardMode: false, mustPassMinigame: false };
  }
}

export const storyEngine = new GameStoryEngine();

export function checkPlotRequirement(
  metHermione: boolean,
  hermioneBondLevel: number
): { canSaveHermione: boolean; outcome: 'success' | 'tragedy'; message: string } {
  if (metHermione && hermioneBondLevel >= 10) {
    return {
      canSaveHermione: true,
      outcome: 'success',
      message: '你与赫敏建立了信任，她信任你会来救她。'
    };
  }
  return {
    canSaveHermione: false,
    outcome: 'tragedy',
    message: '赫敏对你不够信任，她独自面对了巨怪...'
  };
}

export function createKnowledgeFromCard(cardKey: string): KnowledgeEntry | null {
  const card = CHOCOLATE_FROG_CARDS.find(c => c.knowledgeKey === cardKey);
  if (!card) return null;

  return {
    key: card.knowledgeKey!,
    name: card.name,
    description: card.description,
    sourceItem: card.id,
    isSecret: true
  };
}
