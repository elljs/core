import { RouteMenu } from '@/router';
import { ForcedSubject, MongoAbility, RawRuleOf, createMongoAbility } from '@casl/ability';
import { createContextualCan } from '@casl/react';
import { createContext, useMemo } from 'react';

function getSubjects(menus: RouteMenu[]) {
    const subjects: string[] = [];
    for (const menu of menus) {
        if (menu.children && menu.children.length > 0) {
            subjects.push(...getSubjects(menu.children));
        } else {
            subjects.push(menu.path!);
        }
    }

    return subjects;
}


export const actions = ['manage', 'create', 'read', 'update', 'delete'] as const;

export type Abilities = [
    typeof actions[number],
    string | ForcedSubject<Exclude<string, 'all'>>
];
export type AppAbility = MongoAbility<Abilities>;
export const createAbility = (rules: RawRuleOf<AppAbility>[]) => createMongoAbility<AppAbility>(rules);

export const AbilityContext = createContext<AppAbility>(null as unknown as AppAbility);
export const Can = createContextualCan(AbilityContext.Consumer);

type AbilityProviderProps = {
    children: React.ReactNode;
    rules: RawRuleOf<AppAbility>[];
};

export function AbilityProvider({ children, rules }: AbilityProviderProps) {
    const value = useMemo(() => createAbility(rules), [rules]);

    return (
        <AbilityContext.Provider value={value}>
            {children}
        </AbilityContext.Provider>
    );
}