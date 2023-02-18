export enum Page {
    HOME,
    COLOR_ON_COLOR,
    COLOR_CREATION,
    COLOR_IDENTIFICATION
}

export interface QuestionCardProps {
    handleCorrect: () => void
    handleAnswer: () => void
}

export interface ColorPageProps {
    setLevel: (page: Page) => void
}