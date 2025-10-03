const { ProfileManager } = require('../profile_manager');

describe('ProfileManager.toTimeSeries', () => {
        it('returns numeric y values for oxygen steps', () => {
                const manager = new ProfileManager();
                manager.addStep(1, 10, 'o');

                const series = manager.toTimeSeries();

                expect(series.length).toBeGreaterThan(0);
                expect(series.every(point => typeof point.y === 'number')).toBe(true);
                expect(series.some(point => point.y > 0)).toBe(true);
        });

        it('returns null y values for air steps', () => {
                const manager = new ProfileManager();
                manager.addStep(1, 10, 'air');

                const series = manager.toTimeSeries();

                expect(series.length).toBeGreaterThan(0);
                expect(series.every(point => point.y === null)).toBe(true);
        });
});
