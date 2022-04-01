import experiments from './optimize-experiments.json';

export function getCurrentExperiment() {
  return experiments.find((exp) => exp.name === 'ping_color');
}
