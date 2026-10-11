import { describe, expect, it } from 'vitest';
import { riskScore, riskFactors, type Student } from './data';
const sample: Student = { id: 'TEST', name: 'Sample', initials: 'S', department: 'CS', year: '3', attendance: 48, grades: 38, backlogs: 3, missed: 6, fees: 1, engagement: 25, placement: 24 };
describe('transparent prototype risk model', () => {
  it('keeps student risk scores between 0 and 100', () => {
    expect(riskScore({ ...sample, attendance: 0, grades: 0, backlogs: 3, missed: 6, fees: 1, engagement: 0, placement: 0 })).toBe(100);
    expect(riskScore({ ...sample, attendance: 100, grades: 100, backlogs: 0, missed: 0, fees: 0, engagement: 100, placement: 100 })).toBe(0);
  });
  it('exposes named contributions that sum to the displayed score', () => {
    expect(riskFactors(sample).map(f => f.name)).toContain('Low attendance');
    expect(Math.round(riskFactors(sample).reduce((sum, f) => sum + f.value, 0))).toBe(riskScore(sample));
  });
  it('reduces attendance risk when simulated attendance increases', () => {
    expect(riskScore(sample, 88)).toBe(riskScore(sample, 48) - 12);
  });
});
