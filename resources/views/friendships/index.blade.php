<div class="relative overflow-x-auto">
  <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
    <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th class="px-6 py-3"
          scope="col">
          Friends
        </th>
        <th class="px-6 py-3"
          scope="col">
          Since
        </th>
      </tr>
    </thead>
    <tbody>
      @foreach ($friendships as $friendship)
        <tr class="bg-white dark:bg-gray-800">
          <td class="px-6 py-4">
            {{ $friendship->recipient->name }}
          </td>
          <td class="px-6 py-4">
            {{ $friendship->created_at }}
          </td>
        </tr>
      @endforeach
    </tbody>
  </table>
</div>
