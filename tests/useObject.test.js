import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useObject from '../src/useObject'

class Counter {
  #count

  constructor(initial = 0) {
    this.#count = initial
  }

  increment() {
    this.#count++
  }

  value() {
    return this.#count
  }
}

describe('useObject', () => {
  it('should return an instance of the object', () => {
    const { result } = renderHook(() =>
      useObject(() => new Counter(5), [], ['inc']),
    )

    expect(result.current.value()).toBe(5)
  })

  it('should re-render when a mutating method is called', () => {
    let renders = 0
    const { result } = renderHook(() => {
      renders++
      return useObject(() => new Counter(0), [], ['increment'])
    })

    expect(result.current.value()).toBe(0)
    expect(renders).toBe(1)

    act(() => {
      result.current.increment()
    })

    // Force render should have triggered
    expect(result.current.value()).toBe(1)
    expect(renders).toBe(2)
  })

  it('should not re-render on non-mutating method calls', () => {
    let renders = 0
    const { result } = renderHook(() => {
      renders++
      return useObject(() => new Counter(0), [], [])
    })

    act(() => {
      result.current.increment() // not tracked as mutator
    })

    expect(result.current.value()).toBe(1)
    expect(renders).toBe(1)
  })

  it('should recreate instance when dependencies change', () => {
    const { result, rerender } = renderHook(
        ({ seed }) =>
          useObject(() => new Counter(seed), [seed], ['increment']),
        { initialProps: { seed: 5 } },
    )

    expect(result.current.value()).toBe(5)

    rerender({ seed: 10 })
    expect(result.current.value()).toBe(10)
  })

  it('should preserve instance when dependencies don\'t change', () => {
    const { result, rerender } = renderHook(
        ({ seed }) =>
          useObject(() => new Counter(seed), [seed], ['increment']),
        { initialProps: { seed: 7 } },
    )

    const first = result.current

    rerender({ seed: 7 })
    const second = result.current

    expect(first).toBe(second)
  })

  it('should re-render after async mutating method is awaited', async () => {
    class AsyncCounter {
      #count

      constructor(initial = 0) {
        this.#count = initial
      }

      async increment() {
        return new Promise((resolve) => {
          setTimeout(() => {
            this.#count++
            resolve()
          }, 20)
        })
      }

      value() {
        return this.#count
      }
    }


    let renders = 0

    const { result } = renderHook(() => {
      renders++
      return useObject(() => new AsyncCounter(0), [], ['increment'])
    })

    expect(result.current.value()).toBe(0)
    expect(renders).toBe(1)

    await act(async () => {
      await result.current.increment()
    })

    expect(result.current.value()).toBe(1)
    expect(renders).toBe(2)
  })
})
