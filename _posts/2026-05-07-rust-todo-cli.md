---
layout: post
title: "Building a CLI Todo App in Rust"
categories: [projects, rust]
tags: [rust, cli, beginner]
---

I've been wanting to learn Rust for a while, so I decided to build a simple CLI todo app. Nothing groundbreaking, but it touches on enough core concepts to make it a solid learning project.

## The goal

A command-line todo app that can:

- Add tasks
- List tasks
- Mark tasks as done
- Delete tasks
- Persist tasks to a file

## Project setup

```bash
cargo new todo-cli
cd todo-cli
```

This generates the standard Rust project structure with a `Cargo.toml` and `src/main.rs`.

## Data model

I kept it simple — a `Task` struct with three fields:

```rust
#[derive(Debug, Serialize, Deserialize)]
struct Task {
    id: u64,
    description: String,
    done: bool,
}
```

Using `serde` for serialization means I can store tasks as JSON with almost no boilerplate. The `id` field is just a monotonically incrementing `u64`.

## The command loop

The CLI accepts subcommands via `clap`:

```rust
enum Command {
    Add { description: String },
    List,
    Done { id: u64 },
    Delete { id: u64 },
}
```

Clap handles all the argument parsing, help text generation, and error messages. It's one of those crates that makes you feel like you're cheating.

## Reading and writing

Tasks are stored in `~/.todo-cli/tasks.json`. On startup, the app reads the file (or creates it if it doesn't exist), deserializes the JSON into a `Vec<Task>`, runs the command, and writes the result back.

```rust
fn load_tasks(path: &Path) -> Vec<Task> {
    if !path.exists() {
        return Vec::new();
    }
    let data = fs::read_to_string(path).unwrap_or_default();
    serde_json::from_str(&data).unwrap_or_default()
}
```

## What I learned

- **Ownership and borrowing** — it finally clicked. The compiler's error messages are surprisingly helpful.
- **Pattern matching** — Rust's `match` is incredibly expressive.
- **The type system** — `Option<T>` and `Result<T, E>` eliminate entire categories of bugs at compile time.
- **Cargo** — dependency management, building, formatting, linting — all built in.

## Takeaways

Rust lives up to its promises. The learning curve is real, but the tooling and compiler feedback make it manageable. I'd recommend a small CLI project like this to anyone learning the language — it's practical enough to keep you motivated but small enough to finish in a weekend.

The full source is [on GitHub](https://github.com/ExtraordinaryBen) if you want to check it out.
