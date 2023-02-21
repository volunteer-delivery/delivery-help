type FilterCriteria<Item> = (item: Item) => boolean;

export abstract class Filter<Item> {
    private criterias: FilterCriteria<Item>[] = [];

    protected constructor(protected list: Item[]) {}

    public addCriteria(condition: boolean, criteria: FilterCriteria<Item>): this {
        if (condition) this.criterias.push(criteria);
        return this;
    }

    public apply(): Item[] {
        return this.list.filter((item) => {
            return this.criterias.every((criteria) => criteria(item));
        });
    }
}
