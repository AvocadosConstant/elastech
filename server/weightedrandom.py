import random
import math

def genRandom(small, big):
    rand = random.uniform(0, 1)
    if rand < .25:
        return 0
    if random.uniform(0, 1) > .5:
        rand = math.pow(rand, 2./3)  
    if small >= 0:  # no negative angles
        return small + rand * (big - small)
    # negative angles exist
    sign = random.uniform(0, 1)   
    if sign < (-small / float(big - small)):
        return small * rand
    return big * rand
