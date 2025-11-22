export const pythonCode = `import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

# thong so de bai
q = -1.602e-19
m = 9.109e-31
E = np.array([0, 0, 500])
B = np.array([0, 0, 1.0])

r0 = [0, 0, 0]
v0 = [1e5, 1e5, 0]

# ham nay viet theo mau cua scipy: f(t, y)
def motion(t, y):
    # y gom 6 phan tu: [x, y, z, vx, vy, vz]
    v_vec = np.array([y[3], y[4], y[5]])
    
    # F = q(E + v x B)
    F = q * (E + np.cross(v_vec, B))
    
    a = F / m
    
    # tra ve dao ham [v, a]
    return [y[3], y[4], y[5], a[0], a[1], a[2]]

# chay tu t=0 den t=2e-10
t_span = [0, 2e-10]
y0 = r0 + v0 

# giai phuong trinh
sol = solve_ivp(motion, t_span, y0, max_step=1e-13)

# ve hinh
fig = plt.figure()
ax = fig.add_subplot(projection='3d')

ax.plot(sol.y[0], sol.y[1], sol.y[2])
ax.scatter(sol.y[0][0], sol.y[1][0], sol.y[2][0], color='green', label='Start') 
ax.scatter(sol.y[0][-1], sol.y[1][-1], sol.y[2][-1], color='red', label='End')  

ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.legend()

plt.show()`;
