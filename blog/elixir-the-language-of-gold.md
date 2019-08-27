---
title: Elixir - The Language of Gold
path: elixir-the-language-of-gold
date: 2019-07-27
summary: Functional Programming has always been on my list of things to learn. Elixir fulfills my itch in this area. In this post I explain why I use it... and why you should too.
tags: ['coding', 'backend', 'elixir']
---


![Elixir](./images/elixir.png)

Functional Programming has always been on my list of things to learn. Elixir fulfills my itch in this area. In this post I explain why I use it... and why you should too.



Coming from an OOP background (Java, Python, Javascript), it took sometime grasping the FP paradigm. For example using recursion in place of a for loop... oh yeah did I mention, for loops don't exist in Elixir! Learning Functional Programming has really opened my views to new ways to tackle issues; to think differently, more elegant. There are soo many amazing features such as concurency, fault-tolerance, scalability, hooking into to the live production application and debug or push code deltas whithout any downtime... There are too many to list here so I will only give you my three favorite features. You really need to try it for yourself to really grasp it though. I suggest you go to the [Elixir Homepage](https://elixir-lang.org/) and give it a go.

[Elixir: A Mini-Documentary](https://www.youtube.com/watch?v=lxYFOM3UJzo)

## My Top Features:
* [Pipe Operator](#pipe-opertor)
* [Pattern Matching](#pattern-matching)
* [Doctests](#doctests)


## Pipe Operator

In Elixir, we adopt the *NIX philosophy of small, focused command-line tools that can be combined in arbitrary ways. Each program consuming, transforming and then spitting the output to the next program in the pipeline. Being huge into Linux this makes my heart very happy! 

```bash
$ ps aux | grep conky | grep -v grep | awk '{print $2}' | xargs kill
```


No Pipes :(
```elixir
foo(bar(hello("world")))
```
  

With Pipes :)
```elixir
"World"
|> hello()
|> bar()
|> foo()
```


This syntactic sugar not only looks nice but it makes it very readable and easy to test.



To achieve results closest to pipes in other languages, some people might do the following:
```python
result = hello('World')
result = bar(result)
result = foo(result)
```
  



***

## Pattern Matching

How can we talk about Elixir without mentioning one of its most powerfull features - _Pattern Matching_.

### Another Way of Looking at the Equals Sign

> Elixir’s pattern matching is similar to Erlang’s (the main difference being that Elixir allows a match to reassign to a variable that was assigned in a prior match, whereas in Erlang a variable can be assigned only once). Joe Armstrong, Erlang’s creator, compares the equals sign in Erlang to that used in algebra. When you write the equation x = a + 1, you are not assigning the value of a + 1 to x. Instead you’re simply asserting that the expressions x and a + 1 have the same value. If you know the value of x, you can work out the value of a, and vice versa. would write if statements in other lang, in elixir you write one for :ok atom (success) and the rest are errors. *~ [Thomas, Dave. Programming Elixir](https://pragprog.com/book/elixir/programming-elixir)*

  
In most languages, we would have a function and then use conditions and flow within the function to handle events. In Elixir we could use seperate functions with pattern matching. For example, the `IO.read()` function always returns an `:ok` Atom if opening the file was okay. So we just have a function that has the `:ok` Atom as an arguemnt and once it matches it will use that function; else it will go onto our next function declaration. which will succeed because we use the `_` wildcard and then display the error message.


```elixir
def handle_open({​:ok​, file}) do
  "​​Read data: ​​#{​IO.read(file, ​:line​)​}​​"​ 
end

def handle_open({​_, error} ) do
 "​​Error: ​​#{​​:file​.format_error(error)​}​​"​
end
```

    
Lets take a look at some other examples.  

  
Lets use the classic FizzBuzz interview question  
Just incase you don't know, here are the rules:
- Write a short program that prints each number from 1 to 100 on a new line.    
- For each multiple of 3, print "Fizz" instead of the number.   
- For each multiple of 5, print "Buzz" instead of the number.   
- For numbers which are multiples of both 3 and 5, print "FizzBuzz" instead of the number.  

Elixir:
```elixir
whichfizz = fn
  (0, 0, _) -> "FizzBuzz"
  (0, _, _) -> "Fizz"
  (_, 0, _) -> "Buzz"
  (_, _, n) -> n
end

fizzbuzz = fn (n) ->
  whichfizz.(rem(n, 3), rem(n, 5), n)
end

IO.inspect Enum.map(1..100, fizzbuzz)
```

Javascript:
```javascript
function fizzbuzz() {  
  for (var i = 1; i <= 100; i++) {
    if ( i % 3 == 0 && i % 5 == 0 ) {
      console.log(‘FizzBuzz’);
    }
    else if ( i % 3 == 0 ) {
      console.log(‘Fizz’);
    }
    else if ( i % 5 == 0 ) {
      console.log(‘Buzz’);
    }
    else {
      console.log(i);
    }
  }
}

fizzbuzz();
```

***


## Doctests 

### In Elixir, Documentation is a first class citizen

```elixir
defmodule Test do
  @doc """
  Parses the given `line` into a command.

  ## Examples

      iex> KVServer.Command.parse "CREATE shopping"
      {:ok, {:create, "shopping"}}

      iex> KVServer.Command.parse "CREATE  shopping"
      {:ok, {:create, "shopping"}}

      iex> KVServer.Command.parse "PUT shopping milk 1"
      {:ok, {:put, "shopping", "milk", "1"}}

      iex> KVServer.Command.parse "GET shopping milk"
      {:ok, {:get, "shopping", "milk"}}

      iex> KVServer.Command.parse "DELETE shopping eggs"
      {:ok, {:delete, "shopping", "eggs"}}

  Unknown commands or commands with the wrong number of
  arguments return an error:

      iex> KVServer.Command.parse "UNKNOWN shopping eggs"
      {:error, :unknown_command}

      iex> KVServer.Command.parse "GET shopping"
      {:error, :unknown_command}

  """
  def parse(line) do
    case String.split(line) do
      ["CREATE", bucket] -> {:ok, {:create, bucket}}
      ["GET", bucket, key] -> {:ok, {:get, bucket, key}}
      ["PUT", bucket, key, value] -> {:ok, {:put, bucket, key, value}}
      ["DELETE", bucket, key] -> {:ok, {:delete, bucket, key}}
      _ -> {:error, :unknown_command}
    end
  end
end
```

Running `mix test`:
```bash
$ mix test
..

Finished in 0.1 seconds
7 doctests, 1 test, 0 failures
```


Now we see that not only do our tests run, but so do our doctests!   
This lets us maintain **up to date documentation**


***

## Ecosystem

- [Mix (Build Tool)](https://elixir-lang.org/getting-started/mix-otp/introduction-to-mix.html)
- [Hex (Package Manager)](https://hex.pm/)
- [Phoenix (MVC Server-Side Web Framework)](https://phoenixframework.org/)
- [Nerves (Embedded Systems and Devices Framework)](https://nerves-project.org/)
- [Ecto (Database wrapper and query generator)](https://hexdocs.pm/ecto/Ecto.html)
- [Absinthe (GraphQL toolkit)](https://hexdocs.pm/absinthe/overview.html)


