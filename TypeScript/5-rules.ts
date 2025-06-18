interface User {
  isActive: boolean;
  roles: string[];
  groups: string[];
  clearanceLevel: number;
  has2FA: boolean;
}

interface Rule {
  evaluate(user: User): boolean;
  toString(): string;
}

class IsActive implements Rule {
  evaluate(user: User): boolean {
    return user.isActive;
  }
  toString() {
    return 'IsActive';
  }
}

class HasRole implements Rule {
  constructor(private role: string) {}
  evaluate(user: User): boolean {
    return user.roles.includes(this.role);
  }
  toString() {
    return `HasRole(${this.role})`;
  }
}

class InGroup implements Rule {
  constructor(private group: string) {}
  evaluate(user: User): boolean {
    return user.groups.includes(this.group);
  }
  toString() {
    return `InGroup(${this.group})`;
  }
}

class HasClearance implements Rule {
  constructor(private minLevel: number) {}
  evaluate(user: User): boolean {
    return user.clearanceLevel >= this.minLevel;
  }
  toString() {
    return `HasClearance(≥${this.minLevel})`;
  }
}

class Has2FA implements Rule {
  evaluate(user: User): boolean {
    return user.has2FA;
  }
  toString() {
    return 'Has2FA';
  }
}

class AndRule implements Rule {
  constructor(private rules: Rule[]) {}
  evaluate(user: User): boolean {
    return this.rules.every((r) => r.evaluate(user));
  }
  toString() {
    return `(${this.rules.map((r) => r.toString()).join(' AND ')})`;
  }
}

class OrRule implements Rule {
  constructor(private rules: Rule[]) {}
  evaluate(user: User): boolean {
    return this.rules.some((r) => r.evaluate(user));
  }
  toString() {
    return `(${this.rules.map((r) => r.toString()).join(' OR ')})`;
  }
}

const accessRule = new AndRule([
  new IsActive(),
  new OrRule([
    new HasRole('admin'),
    new AndRule([
      new HasRole('support'),
      new InGroup('management'),
      new AndRule([new HasClearance(3), new Has2FA()]),
    ]),
  ]),
]);

const users: User[] = [
  {
    isActive: true,
    roles: ['support'],
    groups: ['management'],
    clearanceLevel: 3,
    has2FA: true,
  },
  {
    isActive: true,
    roles: ['admin'],
    groups: [],
    clearanceLevel: 1,
    has2FA: false,
  },
  {
    isActive: false,
    roles: ['admin'],
    groups: [],
    clearanceLevel: 5,
    has2FA: true,
  },
  {
    isActive: true,
    roles: ['user'],
    groups: ['staff'],
    clearanceLevel: 2,
    has2FA: true,
  },
];

console.log('Access Rule:', accessRule.toString());
for (const user of users) {
  const allowed = accessRule.evaluate(user);
  console.log(
    `${JSON.stringify(user)}\n  ${allowed ? 'Access Granted' : 'Access Denied'}`,
  );
}
