<h3>Try out Digital Ocean storage</h3>
<h4>This form will try to create a txt file that says Hello World</h4>
<form action="{{ route('uploadFileToSpace') }}" method="post" enctype="multipart/form-data">
    @csrf  
    <button type="submit">Upload</button>
</form>