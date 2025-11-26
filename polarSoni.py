import sounddevice as sd
import numpy as np


def sonify(radius):
    """
    Sonify the curve given in polar form by `r = radius(theta)`.

    :param radius: the radius function.
                   `radius` should take and return numpy arrays.
    """
    duration = 4.0
    sample_rate = 44100
    sample_count = int(sample_rate * duration)
    theta = np.linspace(0, 2 * np.pi, sample_count, endpoint=False)
    phase = 440 * 2 * np.pi * np.cumsum(radius(theta)) * (theta[1] - theta[0])
    tone = 0.5 * np.sin(phase)
    for i in range(len(theta)):
        if radius(theta[i]) < 0:
            tone[i] += np.random.normal(loc=0, scale=0.01)
    sd.play(tone, samplerate=sample_rate)


def circle(r):
    """
    Sonify a circle with radius `r` centered at the origin.
    
    :param r: The radius of the circle.
    """
    sonify(lambda t: np.full_like(t, r))

def ellipse(a, b):
    """Sonify an ellipse.

    :param a: The length of the semi-major axis along the x-axis.
    :param b: The length of the semi-major axis along the y-axis.
    """
    sonify(lambda t: a * b / np.sqrt((a * np.cos(t)) ** 2 + (b * np.sin(t)) ** 2))

def spiral(scale):
    """
    Sonify a spiral given by the equation `r = scale * theta`.

    :param k: a scaling factor to control the shape of the spiral.
    """
    sonify(lambda t: scale * t)

def flower(k):
    """
    Sonify a flower curve with `2k` petals.

    :param k: A parameter controlling the number of petals.
    """
    sonify(lambda t: np.sin(k*t))
    