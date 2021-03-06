declare module "telegraf/scenes/base" {
    import { Middleware, Composer, Context } from "telegraf";

    export interface SceneContextOptions {
        sessionName: string;
        default?: string;
        ttl?: number;
    }
    
    export interface SceneContext<TContext extends SceneContextMessageUpdate> {
        ctx: TContext;

        scenes: Map<string, Scene<TContext>>;

        options: SceneContextOptions;

        readonly session: {
            state?: object,
            current?: string,
            expires?: number
        },

        state: object;

        readonly current: Scene<TContext> | null;

        reset: () => void;

        enter: (sceneId: string, initialState?: object, silent?: boolean) => Promise<any>;

        reenter: () => Promise<any>;

        leave: () => Promise<any>
    }

    export interface SceneContextMessageUpdate extends Context {
        scene: SceneContext<this>
    }

    export interface BaseSceneOptions<TContext extends SceneContextMessageUpdate> {
        handlers: Middleware<TContext>[];
        enterHandlers: Middleware<TContext>[];
        leaveHandlers: Middleware<TContext>[];
        ttl?: number;
    }
    
    export default class Scene<TContext extends SceneContextMessageUpdate> extends Composer<TContext> {
        constructor(id: string, options?: Partial<BaseSceneOptions<TContext>>)
    
        id: string;
    
        options: BaseSceneOptions<TContext>;
    
        enterHandler: Middleware<TContext>;
    
        leaveHandler: Middleware<TContext>;
    
        ttl?: number;
    
        enter: (...fns: Middleware<TContext>[]) => this;
    
        leave: (...fns: Middleware<TContext>[]) => this;
    
        enterMiddleware: () => Middleware<TContext>;
    
        leaveMiddleware: () => Middleware<TContext>;
    }
}
