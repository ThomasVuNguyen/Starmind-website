+++
title = "Training a language model to run on RP2040"
date = "2025-08-05"
spent = "$20"
+++

Establish a baseline architecture for our tiny language model that can run efficiently on a Raspberry Pi.
<!--more-->
---

## Approach
- Started with a small transformer architecture (6 layers, 8 attention heads, 512 hidden dimensions)
- Trained on a curated dataset of 1GB text data
- Used knowledge distillation from a larger model

## Results
- Model size: 45MB
- Inference speed: 2.3 tokens/second on Raspberry Pi 4
- Perplexity: 12.4 (baseline)

## Next Steps
- Optimize attention mechanism for mobile hardware
- Experiment with different activation functions
- Test on various Raspberry Pi models

## Resources
- [Code Repository](https://github.com/starmind/experiment-001)
- [Model Weights](https://huggingface.co/starmind/baseline-model)
- [Dataset](https://huggingface.co/datasets/starmind/curated-text-1gb)