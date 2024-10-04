import React, { useEffect, useState, useCallback } from 'react'
import Input from './Input'
import { useForm } from 'react-hook-form'
import RTE from './RTE'
import dbService from '../appwrite/data'
import Select from './Select'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PostForm = ({ post }) => {
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)


    const { register, handleSubmit, control, setValue, watch, getValues, formState: {isSubmitting} } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const submitHandler = async (data) => {
        setLoading(true);
        setError('');
        try {
            let file;
            if (data.image?.[0]) {
                file = await dbService.uploadFile(data.image[0]);
            }

            if (post) {
                if (file) {
                    await dbService.deleteFile(post.featuredImage);
                }
                await dbService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });
            } else {
                if (file) {
                    await dbService.createPost({
                        ...data,
                        featuredImage: file.$id,
                        userId: userData.$id,
                    });
                }
            }

            navigate('/');
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);




    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch]);




    return (
        <form onSubmit={handleSubmit(submitHandler)} className='flex md:flex-row flex-col gap-12 p-8 pb-6'>
            <div className='md:w-2/3 space-y-6'>
                <Input
                    label="Title"
                    placeholder="Title"
                    {...register("title", { required: true })} />
                <Input
                    label="Slug"
                    placeholder="Slug"
                    {...register("slug", {required: true})}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content" type="text" control={control} defaultValue={getValues("content")}/>
            </div>
            <div className='md:w-1/3 space-y-10'>
                <Input
                    type="file"
                    label="Image"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post &&
                    <div>
                        <img src={dbService.getFilePreview(post.featuredImage)} className='w-12' alt="" />
                    </div>
                }

                <Select
                    options={["active", "inactive"]}
                    label="Status : "
                    {...register("status", {required: true})}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="flex justify-around items-center hover:bg-opacity-90" disabled={isSubmitting}>
                    {post ? "Update" : "Submit"}
                    {loading ? <div className=" ml-2 h-6 w-6 border-4 border-t-blue-500 rounded-full animate-spin "></div> : null}

                </Button>
            </div>
        </form>
    )
}

export default PostForm