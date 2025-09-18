+++
title = "Train a tiny model on Grade School Math"
date = "2025-09-17"
spent = "$1100"
+++

![Starmind Pico](/tiny-gsm/tinygsm.png)
Dumb model trained on simple math = smarter model?
<!--more-->
---

## Background

In 2023, [the TinyGSM paper](https://arxiv.org/abs/2312.09241) from Microsoft showed that training a Small Language Model on Grade School Math helps it out-perform much larger models on the GSM8K math benchmark.

![Starmind Pico](/tiny-gsm/og-results.png)

This was achieved by generating synthetic data from a Large Language Model like GPT-3.5 and train a fine-tune small models on that data. The fine-tuned model uses code to solve math problems.

![Prompts](/tiny-gsm/simple-math-problem.png)

---

## My approach: quality & diversity

Since 2023, there have been a few changes: there are wayyyy more Large Language Models & they are magnitudes better than GPT-3.5.

After reading [a BabyAGI Paper](https://arxiv.org/abs/2508.04816) about how Teacher model diversity improves the Student fine-tuned models, I decided to replicate the TinyGSM experiment with multiple high-quality Teacher models.

---

## Step 0: How do we pay for all this?
![Coins](/tiny-gsm/coins.png)

The original TinyGSM dataset contains 1.8B tokens (12 millions question-answer pairs), and costs $3600 to generate. Adding in the compute for fine-tuning, it gets real expensive real fast.

Unlike Microsoft, I'm a startup founder. Therefore, I will try to do this for free!

Here is my strategy to pay for all this:
- Azure AI Foundary: By creating a Microsoft Startup account, I received have $1000 in credits.
- AWS Bedrock: Because I was a mentor at an AWS Hackathon, I was given $200 in credits.
- Prime Intellect: Thanks to [Inflection Grant](https://www.inflectiongrants.com/), I received $2000 in GPU credits.
- Cloudrift: Thanks to [their](https://www.cloudrift.ai/) generosity, I have been given $800 in GPU credits and model inference.

---

## Step 1: Synthetic data generation

The data generation process is pretty straight forward. We first gather a list of Large Language Models (LLM), ask them a mathematical question, get the answer, check its correctness, and store it in a database. 

![Synthetic data generation illustration](/tiny-gsm/syn-data-gen.png)

To utilize diversity and quality of 2025's Language Models, we will utilize a set of models:

- GPT 4.1, GPT 4.1 mini & GPT 4.1 nano (Azure AI Foundary)
- o4-mini (Azure AI Foundary)
- Llama3.3 70B (AWS Bedrock)
- Mixtral 8x7B (AWS Bedrock)
- Deepseek R1 (Cloudrift)
- Llama3.1 8B (Local GPU)

After running [Synthetic Data Generator](https://github.com/ThomasVuNguyen/TinyGSM-SyntheticGen) for 7 days straight on my Mac Mini, I have created 12 TinyGSM sub-datasets.

![Dataset](/tiny-gsm/dataset.png)

There are 3 types of datasets:
- Instructed dataset: The LLM is given explicit examples of how the code should be generation.
- No-example: No example is given to the LLM, the code is free-style.
- Reasoning: The reasoning LLM answers with their reasoning chains.

Overall $1000 in cloud credits were spent.

--- 

## Step 2: Data filtering

Using [Data Filtering Engine](https://github.com/ThomasVuNguyen/TinyGSM-Filter), all 12 datasets were analyzed for correctness, structure, code runnability & reasoning quality.

![Filter](https://github.com/ThomasVuNguyen/TinyGSM-Filter/raw/main/assets/icon.png)

Overall, here are the findings:
- GPT4.1 & GPT4.1 mini generated (almost) 100% correct responses.
- o4-mini & Deepseek R1 has amazing reasoning capabilities.
- Llama3.3 70B & Llama3.1 8B are frequently correct but overly verbose.
- Mixtral 8x7B quality is horrible, non-working code & missing details are frequent.
- GPT 4.1 nano quality is also bad.

- When given no examples, model responses are more verbose and less correct.
- When given a chance to reason, models perform much better.


![Azure Violation](/tiny-gsm/azure-violation.png)
(sidenote: Microsoft does not like it when you extracts o4-mini reasoning.)

More details [here](https://github.com/ThomasVuNguyen/TinyGSM-Filter/blob/main/dataset_comparison_results/sample-1000/dataset_comparison_analysis.md).



---

## Step 3: Model fine-tuning

With dataset figured out, let's finetune a few language models!
![Workout](/tiny-gsm/workout.png)

We will pick the good ones to finetune a Gemma3-270M model. We pick this base model for 2 reasons:
- It's small enough to run decent on the Raspberry Pi 2 W & insanely fast on Orange Pi 5.
- Unsloth fine-tuning & evaluation codes for this model are easy to use.