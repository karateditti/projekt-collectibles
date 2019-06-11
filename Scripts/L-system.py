import turtle

t = turtle.Turtle()
turtle.tracer(0, 0)
rules = {
"A": "AA",
"B":"B+A-B-A+B",
"C":"C-D--D+C++CC+D-",
"D":"+C-DD--D-C++C+D",
"F": "F+F--F+F"
}
iterations = 6
angle = 60
s = 50
turtle.setworldcoordinates(0,-5000,5000,1000)
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
            elif c is "C":
                t.forward(s)
            elif c is "D":
                t.back(s)


ls = LSystem()
#   "C"         =>  Gosper Curve
#   "F"         =>  Koch Curve
#   "F+F--F+F"  => Koch Snowflake
axiom = "F+F--F+F"
sequence = ls.process(axiom,rules,iterations)
ls.move_turtle(sequence)
turtle.update()
turtle.exitonclick()
