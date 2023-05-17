<?php

namespace App\Http\Controllers;

require_once '../vendor/autoload.php';

use Cloudinary\Cloudinary;
use Cloudinary\Transformation\Resize;
use GuzzleHttp\Psr7;
use Illuminate\Http\Request;
use GuzzleHttp\Client as GuzzleClient;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Middleware;
use MicrosoftAzure\Storage\Blob\BlobRestProxy;

class SpaceController extends Controller
{

    public function index()
    {
        return view('testPage');
    }

    /*
DefaultEndpointsProtocol=https;AccountName=rrblobfsd05;AccountKey=392p3hsd1oMeNkHbeYsxQd3EKmo3tSMk2wwRXgqoldNm4M5hz8nICLya5QLxYhew5y/Tr3h7x8mw+AStkOdciw==;EndpointSuffix=core.windows.net
    */
    public function uploadCoverImageToSpace($coverImageURL)
    {

        $cloudinary = new Cloudinary(
            [
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_NAME'),
                    'api_key'    => env('CLOUDINARY_KEY'),
                    'api_secret' => env('CLOUDINARY_SECRET'),
                ],
            ]
        );
        $fileName = substr(md5(uniqid()), 0, 8);

        $cloudinary->uploadApi()->upload(
            $coverImageURL,
            ['public_id' => $fileName]
        );

        return $cloudinary->image($fileName)->toUrl();


        // try {
        //     $connString = "DefaultEndpointsProtocol=https;AccountName=rrblobfsd05;AccountKey=392p3hsd1oMeNkHbeYsxQd3EKmo3tSMk2wwRXgqoldNm4M5hz8nICLya5QLxYhew5y/Tr3h7x8mw+AStkOdciw==;EndpointSuffix=core.windows.net";
        //     // Create a new BlobRestProxy instance
        //     $blobClient = BlobRestProxy::createBlobService($connString);
        //     // // Set the User-Agent header (needed for calling API from the server)
        //     $context = stream_context_create([
        //         'http' => [
        //             'user_agent' => 'Regex Records(Laravel Student Project)',
        //         ],
        //     ]);

        //     // Get the contents of the cover image from the URL
        //     $fileContents = file_get_contents($coverImageURL, false, $context);

        //     // Generate a unique filename for the image
        //     $fileName = md5(uniqid()) . '.jpg';
        //     //Call to undefined function GuzzleHttp\Psr7\stream_for()
        //     // Upload the image to your Azure Blob Storage
        //     $blobClient->createBlockBlob(env('AZURE_STORAGE_CONTAINER'), $fileName, $fileContents);

        //     // Return the URL of the uploaded image
        //     $imageUrl = env('AZURE_STORAGE_URL') . '/' . env('AZURE_STORAGE_CONTAINER') . '/' . $fileName;
        //     error_log('Cover image uploaded successfully: ' . $imageUrl);
        //     return $imageUrl;
        // } catch (\Exception $e) {
        //     // Log the error
        //     error_log('Error uploading cover image: ' . $e->getMessage());

        //     // Throw the exception to be handled by the caller
        //     throw $e;
        // }


        // // Create a new S3Client instance
        // $client = new S3Client([
        //     'version' => 'latest',
        //     'region' => 'us-east-1',
        //     'endpoint' => 'https://nyc3.digitaloceanspaces.com',
        //     'credentials' => [
        //         'key' => env('DO_SPACES_KEY'),
        //         'secret' => env('DO_SPACES_SECRET'),
        //     ],
        // ]);



        // // Get the contents of the cover image from the URL
        // $fileContents = file_get_contents($coverImageURL, false, $context);

        // // Generate a unique filename for the image
        // $fileName = md5(uniqid()) . '.jpg';

        // // Upload the image to your Space
        // $result = $client->putObject([
        //     'Bucket' => env('DO_SPACES_BUCKET'),
        //     'Key' => $fileName,
        //     'Body' => $fileContents,
        //     'ContentType' => 'image/jpeg',
        //     'ACL' => 'public-read',
        // ]);

        // // Return the URL of the uploaded image
        // return $result['ObjectURL'];

    }
}
