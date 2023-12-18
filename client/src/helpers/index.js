export function getDamage(attacker, defender) {
  return Math.max(getHitPower(attacker) - getBlockPower(defender), 0);
}

export function getHitPower({ power }) {
  const criticalHitChance = Math.random() + 1;
  return power * criticalHitChance;
}

export function getBlockPower(fighter) {
  const dodgeChance = Math.random() + 1;
  return fighter.defense * dodgeChance;
}