+++
title = "How to run LLM on Raspberry Pi fast (llama.cpp guide)"
date = "2025-09-16"
+++
![Peruvian Llama](https://user-images.githubusercontent.com/1991296/230134379-7181e485-c521-4d23-a0d6-f7b3b61ba524.png)

How to get your Raspberry Pi run Large Language Models as fast as possible using llama.cpp

<!--more-->

---

## Background

Today, I will help you learn about how to chat with an AI model running locally on a Raspberry Pi terminal.

We will install and run llama.cpp, an amazing library that helps low-powered devices like Raspberry Pis run AI models much faster than traditionally.

---

## Install llama.cpp

First, make sure your Raspberry Pi has an Operating System running + internet access. Raspberry Pi OS is highly recommended.

Second, open the terminal and run these following commands to install llama.cpp

```bash
git clone https://github.com/ggml-org/llama.cpp
cd llama.cpp
sudo apt update
sudo apt install libcurl4-openssl-dev cmake
cmake -B build
cmake --build build --config Release -j 8
```

This will take anywhere from a few seconds to minutes, depending on your Raspberry Pi.

Note that if you run this on Raspberry Pi Zero 2W or Zero W, this will likely fail (due to out of RAM). You can resolve this by adding more SWAP memory, if you don't you how to do it, ask me on [Discord](https://discord.gg/rQWPPPNMmZ)


---

## Download the model

Once the above is complete, let's go ahead and download a few AI model!

To run with llama.cpp, AI models must be in the format of GGUF. 

A GGUF AI model's name have 3 parts: model name, parameter count & accuracy level.

- Model name stands for the model family (llama, qwen, smollm, etc.)
- Parameter count shows how large the model is, often in millions, billions or trillions (360M, 1.7B, etc.)
- Accuracy level shows the quantization level of a model. There are different levels like PF16, Q8, Q4K_M, Q3, Q2, etc. The lower the number, the less accurate the model becomes, but significantly the model file size, leading to a higher speed when run.

These model files are often found at [Huggingface](https://huggingface.com)

If you have a Raspberry Pi 4 or 5, you can try out Qwen3:0.6B model:

```bash
cd build/bin

# You can find these models on Huggingface
wget https://huggingface.co/Qwen/Qwen3-0.6B-GGUF/resolve/main/Qwen3-0.6B-Q8_0.gguf

# Once complete run the model

./llama-cli -m Qwen3-0.6B-Q8_0.gguf
```

If you have a Raspberry Pi Zero 2W or similar, try Smollm2:135M - a smaller model:
```bash
cd build/bin

# You can find these models on Huggingface
wget https://huggingface.co/unsloth/SmolLM2-135M-Instruct-GGUF/resolve/main/SmolLM2-135M-Instruct-Q4_K_M.gguf

# Once complete run the model

./llama-cli -m SmolLM2-135M-Instruct-Q4_K_M.gguf
```

Just like that, you can chat away with the model!


---

## Tips for energy saving

llama.cpp runs using all 4 CPU cores of a Raspberry Pi by default. However, you can achieve 90-95% of the performance with just 2 CPU cores!

This means half the heat, half the power usage & same performance. This is due to the AI performance is based on RAM speed, not CPU speed.

```bash
# Raspberry Pi 4 or 5
./llama-cli -m Qwen3-0.6B-Q8_0.gguf -t 2

# Raspberry Pi Zero 2W
./llama-cli -m SmolLM2-135M-Instruct-Q4_K_M.gguf -t 2
```

However, this depends a lot on the Raspberry Pi model (RPi 5 works better than RPi 4 in this regard). Try it out and see for yourself at varying CPU core count (1 to 4)!

---

## Final words

![Llama](https://www.fayobserver.com/gcdn/authoring/2018/04/14/NTFO/ghows-NC-69d06945-9a30-1f75-e053-0100007f0bcd-3502e6c7.jpeg?width=1200&disable=upscale&format=pjpg&auto=webp)

If you have trouble along the way, try asking ChatGPT or Claude.

If that don't work, ask me at [Discord](https://discord.gg/rQWPPPNMmZ)
