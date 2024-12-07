export function getNumberGrid(input: string) {
    const rows = input.split('\n');
    return rows.map((row) => row.split(' ').map(Number));
}
