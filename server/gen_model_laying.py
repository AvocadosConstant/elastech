import bpy
import math
import random

NUM_AXIS = 3

# Format: bone_name: (xlow, xhigh, ylow, yhigh, zlow, zhigh)
BONE_ANGLES = { 'spine'      : [  0, 1.7, 0., 0.,  -0.3, 0.3],
                'shoulder.R' : [  0., 0.,   0., 0., 0., 0.],
                'shoulder.L' : [  0., 0.,   0.,0.,  0., 0.],
                'uparm.R'    : [ 0, 1., 0,  0.,  -0.6,  0.2],
                'uparm.L'    : [ 0, 1., 0,  0.,  -0.6,  0.2],
                'lowarm.R'   : [  0., 2.3,   0.,   0.,  0.,   0.],
                'lowarm.L'   : [  0., 2.3,   0.,   0.,  0.,   0.],
                'head'       : [ 0,  0.9, -0.1, 0.1, -0.3,  0.3],
                'thigh.R'    : [  0., 0.8,   -0.3, 0.3,  -0.1, 0.1],
                'thigh.L'    : [  0., 0.8,   -0.3, 0.3,  -0.1, 0.1],
                'shin.R'     : [  -1., 0.,   0., 0.,  0., 0.],
                'shin.L'     : [  -1., 0.,   0., 0.,  0., 0.] }

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
                
def get_dict():
    arms = bpy.data.armatures
    poses = []
    for pose in arms:
        poses.append(pose)
    bone_dict = {}
    for bone in poses[0].bones:
        bone_dict[bone.name] = bone
    return bone_dict

def gen_model(bone_dict):
    bpy.ops.object.mode_set(mode='POSE')
    for item in bpy.context.selectable_objects:
        item.select = False
    for name, bone in bone_dict.items():
        bone.select = True
        bounds = BONE_ANGLES[name]
        rotangles = []
        for axis in range(NUM_AXIS):
            angle = genRandom(bounds[axis * 2], bounds[axis * 2 + 1])
            rotangles.append(angle)
        bpy.ops.transform.rotate(value=rotangles[0], axis=(1, 0, 0))
        bpy.ops.transform.rotate(value=rotangles[1], axis=(0, 1, 0))
        bpy.ops.transform.rotate(value=rotangles[2], axis=(0, 0, 1))
        bone.select = False
    bpy.ops.wm.collada_export(filepath='models/gen/gen.dae',
                              selected=False, check_existing=False, apply_modifiers=True,
                              active_uv_only=True, include_uv_textures=True, open_sim=True,
                              triangulate=True, use_object_instantiation=True)
                             
gen_model(get_dict())
quit()