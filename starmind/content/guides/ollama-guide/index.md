+++
title = "How to run LLM on Raspberry Pi conveniently (Ollama guide)"
date = "2025-09-16"
+++
![Ollama](https://ollama.com/public/blog/3ollamas.png)

The easiest way to run AI models on Raspberry Pi
<!--more-->

---

## Background

Today, I will help you learn about how to chat with an AI model running locally on a Raspberry Pi terminal, using Ollama.

Although not the most performant method, Ollama is for sure the easiest way to chat with AI locally.

---

## Install Ollama

First, make sure your Raspberry Pi has an Operating System running + internet access. Raspberry Pi OS is highly recommended.

Second, open the terminal and run these following commands to install llama.cpp

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

This will take anywhere from a few seconds to minutes, depending on your Raspberry Pi.

Refer to [Ollama Website](https://ollama.com/download/linux) for the most up-to-date command to run if this fails.

Note that if you run this on Raspberry Pi Zero 2W or Zero W, this will likely fail (due to out of RAM). You can resolve this by adding more SWAP memory, if you don't you how to do it, ask me on [Discord](https://discord.gg/rQWPPPNMmZ)


---

## Download a model

If you visit [Ollama](https://ollama.com), you can find a vast number of models to play with. 
A model's name have 2 parts: model name & parameter count

- Model name stands for the model family (llama, qwen, smollm, etc.)
- Parameter count shows how large the model is, often in millions, billions or trillions (360M, 1.7B, etc.)

If you have a Raspberry Pi 4 or 5, you can try Gemma3:1B model (by Google):

```bash
ollama run gemma3:1b
```

If you have a Raspberry Pi Zero 2W or similar, try Smollm:135M - a smaller model:
```bash
ollama run smollm:135m
```

Just like that, you can chat away with the model!

---

## Final words

![Llama](https://thumbs.dreamstime.com/b/funny-llama-12434396.jpg)

If you have trouble along the way, try asking ChatGPT or Claude.

If that don't work, ask me at [Discord](https://discord.gg/rQWPPPNMmZ)
