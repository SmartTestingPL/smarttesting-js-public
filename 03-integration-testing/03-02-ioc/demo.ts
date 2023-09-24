import 'reflect-metadata'

interface Type<T> {
  new(...args: any[]): T;
}

export type GenericClassDecorator<T> = (target: T) => void;

const Service = () : GenericClassDecorator<Type<object>> => {
  return (target: Type<object>) => {
    // do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
  };
};

export const Injector = new class {
  // resolving instances
  resolve<T>(target: Type<any>): T {
    // tokens are required dependencies, while injections are resolved tokens from the Injector
    let tokens = Reflect.getMetadata('design:paramtypes', target) || [],
        injections = tokens.map((token: any) => Injector.resolve<any>(token));
    
    return new target(...injections);
  }
};

interface LoggerInterface {
  write(message: string): void;
}

class Server {
  constructor(private logger: LoggerInterface) {
    this.logger.write('Service called');
  }
}



@Service()
class Foo {
  doFooStuff() {
    console.log('foo');
  }
}

@Service()
class Bar {
  constructor(public foo: Foo) {
  }

  doBarStuff() {
    console.log('bar');
  }
}

@Service()
class Foobar {
  constructor(public foo: Foo, public bar: Bar) {
  }
}

const foobar = Injector.resolve<Foobar>(Foobar);
foobar.bar.doBarStuff();
foobar.foo.doFooStuff();
foobar.bar.foo.doFooStuff();

