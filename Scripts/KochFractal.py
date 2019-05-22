import math
import turtle
import matplotlib.pyplot as plt
import numpy as np

t = turtle.Turtle()

class KochFractal:
    """Koch Fractal"""
    a = 60 # angle in degree
    depth = 3

    def calculate_koch(self, p0,dist, angle=0.0, depth=0):
        if(depth>=self.depth):
            return
        depth +=1
        t.setposition(p0)
        t.setheading(angle)
        k_segment =  dist / 3
        t.forward(k_segment)
        t.left(self.a)
        t.forward(k_segment/2/np.cos(np.radians(self.a)))
        t.right( self.a *2)
        t.forward(k_segment / 2 / np.cos(np.radians(self.a)))
        t.left(self.a)
        t.forward(k_segment)
        angle = t.heading()
        self.calculate_koch(p0,dist/3,angle,depth)
        self.calculate_koch([p0[0]+k_segment,p0[1]], k_segment/2/np.cos(np.radians(self.a)), angle+self.a,depth)
        self.calculate_koch([p0[0] + dist/2, p0[1]+k_segment/2*np.tan(np.radians(self.a))], k_segment / 2 / np.cos(np.radians(self.a)), angle-self.a, depth)
        self.calculate_koch([p0[0]+2*k_segment,p0[1]], dist / 3, angle, depth)


kf = KochFractal()
kf.calculate_koch([0,0],600)
turtle.exitonclick()