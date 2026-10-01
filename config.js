const HIS_NAME = "Jia Jia"
const TIPS = [
    `${HIS_NAME} is the cutest person in the world`,
    "Snacks increase his happiness by 200%",
    `Give ${HIS_NAME} a kiss and see what happens! `,
    `${HIS_NAME} is my Mega Knight, he jumped into my heart`,
    `${HIS_NAME} is my favorite card, a legendary cant compare`,
    "Had me at Zap and I've been stunned ever since",
];

// Fill in his name anywhere an element has class="his-name"
document.querySelectorAll(".his-name").forEach(el => el.textContent = HIS_NAME);