export const DEFAULT_CODE = {
  javascript: `// Paste your nasty spaghetti code here...
function calculateTotal(price, tax) {
    const total = price + (price * tax);
    console.log("The total is: " + total);
    return total;
}

calculateTotal(100, 0.1);`,
  typescript: `// Roast your typed garbage...
interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: "John" };
console.log(user);`,
  python: `# Spaghetti in Python? 
def greet(name):
    print(f"Hello, {name}!")

greet("Victim")`,
  java: `// Boilerplate hell...
public class Main {
    public static void main(String[] args) {
        System.out.println("Roast me!");
    }
}`,
  cpp: `// Segfault waiting to happen...
#include <iostream>

int main() {
    std::cout << "Roast me!" << std::endl;
    return 0;
}`,
  go: `// Gophers like it roasted...
package main
import "fmt"

func main() {
    fmt.Println("Roast me!")
}`,
};

export const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'go', label: 'Go' },
];
