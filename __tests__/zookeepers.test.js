const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers.js");

const { zookeepers } = require("../data/zookeepers");
const { JestHook } = require("jest-watcher");
const { exportAllDeclaration } = require("@babel/types");

jest.mock('fs');

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "John", id: "qwerlkjlkjg"},
        zookeepers
    );

    expect(zookeeper.name).toBe("John");
    expect(zookeeper.id).toBe("qwerlkjlkjg");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Danika",
            age: 42,
            favoriteAnimal: "penguin"
        },
        {
            id: "4",
            name: "Terry",
            age: 25,
            favoriteAnimal: "gorilla"
        }
    ]
    const updatedZookeepers = filterByQuery({ favoriteAnimal: "penguin" }, startingZookeepers);
    expect(updatedZookeepers.length).toEqual(1);
})

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Danika",
            age: 42,
            favoriteAnimal: "penguin"
        },
        {
            id: "4",
            name: "Terry",
            age: 25,
            favoriteAnimal: "gorilla"
        }
    ]
    const result = findById("3", startingZookeepers);

    expect(result.name).toBe("Danika");
});

test("validates age", () => {
    const zookeeper = {
        id: "3",
        name: "Danika",
        age: 42,
        favoriteAnimal: "penguin"
    };
  
    const invalidZookeeper = {
        id: "3",
        name: "Danika",
        age: "42",
        favoriteAnimal: "penguin"
    };
  
    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);
  
    expect(result).toBe(true);
    expect(result2).toBe(false);
  });