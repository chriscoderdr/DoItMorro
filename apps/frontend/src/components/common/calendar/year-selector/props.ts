interface IYearSelectorProps {
    currentYear: number;
    activeYear: number;
    onSelectYear: (year: number) => void;
    onClose: () => void;
    minYear?: number; // Optional minimum year
    maxYear?: number; // Optional maximum year
}
