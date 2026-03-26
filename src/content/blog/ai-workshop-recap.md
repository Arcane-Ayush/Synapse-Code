---
title: "Recap: Intro to AI Workshop"
date: "2026-02-10"
author: "Eve"
category: "Workshop Recap"
image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000"
description: "A look back at our successful Intro to AI workshop where we built a simple neural network from scratch."
readingTime: "5 min"
---

# Workshop Recap: Intro to AI 🤖

Last week, we hosted our **Intro to AI** workshop, and the turnout was incredible! Over 50 students joined us to learn the fundamentals of artificial intelligence and machine learning.

## What We Covered

We started with the basics:

- **What is AI?** Understanding the difference between AI, ML, and Deep Learning.
- **Neural Networks**: Visualizing how neurons and layers work together.
- **Hands-on Coding**: We used Python and TensorFlow to build a simple digit recognizer using the MNIST dataset.

## Code Snippet

Here's a snippet of the model we built:

```python
import tensorflow as tf

model = tf.keras.models.Sequential([
  tf.keras.layers.Flatten(input_shape=(28, 28)),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10)
])

loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
model.compile(optimizer='adam', loss=loss_fn, metrics=['accuracy'])
```

## Key Takeaways

1.  **AI is accessible**: You don't need a PhD to start building models.
2.  **Data is key**: The quality of your dataset determines the performance of your model.
3.  **Practice makes perfect**: The best way to learn is by building projects.

## What's Next?

Our next workshop will dive deeper into **Generative AI** and how to use LLMs in your applications. Check the [Activities](/activities) page for details!

Special thanks to **Team Gamma** for organizing this event.
