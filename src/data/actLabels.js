export const ACT_LABELS = [
  { id: 1, label: 'PULSE Integrated', shortLabel: 'Integrated' },
  { id: 2, label: 'Game Invoked',     shortLabel: 'Game' },
  { id: 3, label: 'Game Won',         shortLabel: 'Won' },
  { id: 4, label: 'Vision',           shortLabel: 'Vision' },
  { id: 5, label: 'Embed Code',       shortLabel: 'Embed' },
]

export function getActLabel(actId) {
  return ACT_LABELS.find((a) => a.id === actId)?.label ?? `Act ${actId}`
}
