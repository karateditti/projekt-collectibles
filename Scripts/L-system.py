import turtle

t = turtle.Turtle()
turtle.tracer(0, 0)
rules = {
"A": "AA",
"B":"B+A-B-A+B",
"F": "F+F--F+F"
}
iterations = 7
angle = 60
s = 300
turtle.setworldcoordinates(-10000,-10000,80000,80000)
class LSystem:
    """Lindenmayer system"""
    rules = None
    def process(self,axiom,rules, iterations):
        self.rules = rules
        sequence = axiom
        buffer = "";
        for i in range(iterations):
            for c in sequence:
                 buffer+=self.map(c)
            sequence = buffer;
            buffer = ""
        return sequence

    def map(self, char):
        if char in rules:
            return rules[char]
        return char

    def move_turtle(self, sequence):
        for c in sequence:
            if c is "F":
                t.forward(s)
            elif c is "+":
                t.left(angle)
            elif c is "-":
                t.right(angle)
            elif c is "A":
                t.forward(s)
            elif c is "B":
                t.back(s)


ls = LSystem()

sequence = ls.process("A+A+B",rules,iterations)
turtle.update()
turtle.exitonclick()
