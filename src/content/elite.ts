/**
 * Empresas-membro do ELITE (logos baixados do Drive da marca).
 * Logos coloridos com fundos variados → exibidos em tiles claros na página.
 * TODO(logos): adicionar campoar e demais empresas conforme a pasta evoluir.
 */
export type EmpresaElite = { nome: string; src: string }

const EMPRESAS_ELITE: EmpresaElite[] = [
  { nome: 'Completa Telecomunicações', src: '/images/elite/completa.png' },
  { nome: 'Action 360', src: '/images/elite/action360.jpg' },
  { nome: 'Antares', src: '/images/elite/antares.png' },
  { nome: 'Horsch', src: '/images/elite/horsch.png' },
  { nome: 'Hotsat', src: '/images/elite/hotsat.png' },
  { nome: 'Lab220', src: '/images/elite/lab220.png' },
  { nome: 'Sackett', src: '/images/elite/sackett.png' },
  { nome: 'Vetlog', src: '/images/elite/vetlog.jpg' },
]

export function getEmpresasElite(): EmpresaElite[] {
  return EMPRESAS_ELITE
}
