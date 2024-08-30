// @ts-check

type ValidStatus = "started" | "stopped";

class Vehicle {
  make: string;
  model: string;
  wheels: number;
  status: ValidStatus = "stopped";

  constructor(make: string, model: string, wheels: number) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }
  start() {
    this.status = "started";
  }
  stop() {
    this.status = "stopped";
  }
}

class Car extends Vehicle {
  constructor(make: string, model: string) {
    super(make, model, 4);
  }
}

class MotorCycle extends Vehicle {
  constructor(make: string, model: string) {
    super(make, model, 2);
  }
}

function printStatus(vehicle: Vehicle) {
  if (vehicle.status === "started") {
    console.log("The vehicle is started.");
  } else {
    console.log("The vehicle is stopped.");
  }
}

const myHarley = new MotorCycle("Harley-Davidson", "Low Rider S");
myHarley.start();
printStatus(myHarley);
console.log(myHarley.make.toUpperCase());

const myBuick = new Car("Buick", "Regal");
myBuick.wheels = myBuick.wheels - 1;
console.log(myBuick.wheels);
console.log(myBuick.model);

// Creating a Generic Class

class NCycle<T> {
  make: T | T[];
  model: T | T[];
  wheels: number;
  status: ValidStatus = "stopped";

  constructor(make: T | T[], model: T | T[], wheels: number) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }
  start() {
    this.status = "started";
  }
  stop() {
    this.status = "stopped";
  }
  print(parameter?: number) {
    if (!(this.make instanceof Array) && !(this.model instanceof Array)) {
      console.log(`This is a ${this.make} ${this.model} NCycle.`);
    } else if (
      parameter &&
      this.make instanceof Array &&
      this.model instanceof Array &&
      this.make[parameter] !== undefined &&
      this.model[parameter] !== undefined
    ) {
      console.log(
        `This NCycle has a ${this.make[parameter]} ${this.model[parameter]} at ${parameter}.`
      );
    } else {
      console.log("This NCycle was not created properly.");
    }
  }
  printAll() {
    if (this.make instanceof Array && this.model instanceof Array) {
      for (let i = 0; i < Math.min(this.make.length, this.model.length); i++) {
        console.log(
          `This NCycle has a ${this.make[i]} ${this.model[i]} at ${i}.`
        );
      }
    } else if (
      !(this.make instanceof Array) &&
      !(this.model instanceof Array)
    ) {
      console.log(`This is a ${this.make} ${this.model} NCycle.`);
    } else {
      console.log("This NCycle was not created properly.");
    }
  }
}

// Testing

const testCycle1 = new NCycle<number>(1, 2, 3);
testCycle1.print();
testCycle1.printAll();

const testCycle2 = new NCycle<string>("This", "That", 4);
testCycle2.print();
testCycle2.printAll();

const testCycle3 = new NCycle<string>("Make", 10, 4);
testCycle3.print(4);
testCycle3.printAll();

const makes4 = ["Volkswagon", "Tesla", "Audi"];
const models4 = ["Passat", "Model X", "A4"];
const testCycle4 = new NCycle<string[]>(makes4, models4, 4);
testCycle4.print(2);
testCycle4.printAll();

const makes5 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const models5 = [1, 1, 2, 3, 5];
const testCycle5 = new NCycle<number[]>(makes5, models5, 0);
testCycle5.print(7);
testCycle5.printAll();

function add(x: number, y: number): number {
  return x + y;
}
add(testCycle1.make, testCycle5.model[1]);
// Error expected here
add(testCycle2.make, testCycle4.model[1]);