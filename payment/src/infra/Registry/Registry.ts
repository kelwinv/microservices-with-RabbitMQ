class Registry {
  dependencies: { [keys: string]: unknown } = {};

  provide(name: string, value: unknown): void {
    this.dependencies[name] = value;
  }

  inject(name: string) {
    return this.dependencies[name];
  }
}

export { Registry };
