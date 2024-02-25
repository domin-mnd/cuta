interface Mem<T> {
  label: string;
  data: T;
}

export function memoize<T extends any = any>() {
  const mem: Mem<T>[] = [];
  return {
    get: (label: string): T | undefined => {
      return mem.find((mem) => mem.label === label)?.data;
    },
    add: (label: string, data: T) => {
      if (!mem.find((mem) => mem.label === label)) {
        mem.push({ label, data });
      } else if (typeof data === "number") {
        const i = mem.findIndex((mem) => mem.label === label);
        (mem[i].data as number)++;
      }
    },
    remove: (label: string) => {
      const i = mem.findIndex((mem) => mem.label === label);
      if (i !== -1) mem.splice(i, 1);
    },
  };
}
