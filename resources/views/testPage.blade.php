<h3>Try out Digital Ocean storage</h3>
<form action="{{ route('uploadFileToSpace') }}" method="post" enctype="multipart/form-data">
    @csrf  
    <input type="file" name="file">
    <button type="submit">Upload</button>
</form>