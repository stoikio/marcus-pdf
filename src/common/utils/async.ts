export const mapAsync = async <F, T>(
  collection: F[] | Promise<F>[] | Promise<F[]> | Promise<Promise<F>[]>,
  callback: (value: F, index: number) => T | Promise<T>
): Promise<T[]> =>
  Promise.resolve(collection).then((resolvedCollection) =>
    Promise.all(
      (resolvedCollection as Array<F | Promise<F>>).map((value, index) =>
        Promise.resolve(value).then((resolvedValue) =>
          callback(resolvedValue, index)
        )
      )
    )
  )