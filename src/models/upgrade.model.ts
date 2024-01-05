// Примерное равновесие 1 к 3...
export type Cost = {
	gold: number;
	silver: number;
	gem?: number;
};

export const levelWithGem = [
	10, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300,
	320, 340, 360, 380, 400, 420, 440, 460, 480, 500,
];

const levelWithGemCosts = [
	10, 25, 50, 100, 250, 500, 1000, 1000, 2000, 5000, 10_000, 25_000, 50_000,
	100_000, 200_000, 300_000, 400_000, 500_000, 600_000, 700_000, 800_000,
	900_000, 1_000_000, 2_500_000, 5_000_000, 10_000_000,
];

const PRICES = Array(500)
	.fill(null)
	.map((_, i) => i + 1);

export const startPrice: Cost = {
	gold: 10,
	silver: 30,
};

export const prices = PRICES.map((i) => {
	const price: Cost = {
		silver: startPrice.silver * (1 + i / 10),
		gold: startPrice.gold * (1 + i / 10),
	};
	const levelWithGemIndex = levelWithGem.findIndex((v) => v === i);
	if (levelWithGemIndex !== -1) {
		price.gem = levelWithGemCosts[levelWithGemIndex];
	}
	return price;
});
