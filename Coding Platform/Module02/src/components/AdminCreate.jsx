import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";
import axiosClient from "../utils/axiosClient";
import { useNavigate } from "react-router";
import { Plus, Trash2 } from 'lucide-react';
import { useState } from "react";

// Allowed tags list (lowercase)
const ALLOWED_TAGS = [
  'array','linkedlist','graph','greedy','string','tree','binarysearch','backtracking','recursion','binarytree','stack','queue','heap','design','hashing','bit manipulation','math','trie','segmenttree','bitset','hash table','sorting','divide and conquer','dynamic programming'
];

// Zod schema matching the problem schema (tags validated against ALLOWED_TAGS)
const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.array(z.string().min(1)).min(1, 'At least one tag required').refine(
    (arr) => arr.every((t) => ALLOWED_TAGS.includes(t)),
    { message: 'One or more tags are invalid' }
  ),
  visibleTestCases: z
    .array(
      z.object({
        input: z.string().min(1, 'Input is required'),
        output: z.string().min(1, 'Output is required'),
        explanation: z.string().min(1, 'Explanation is required')
      })
    )
    .min(1, 'At least one visible test case required'),
  hiddenTestCases: z
    .array(
      z.object({
        input: z.string().min(1, 'Input is required'),
        output: z.string().min(1, 'Output is required')
      })
    )
    .min(1, 'At least one hidden test case required'),
  startCode: z
    .array(
      z.object({
        language: z.enum(['C++', 'Java', 'JavaScript']),
        initialCode: z.string().min(1, 'Initial code is required')
      })
    )
    .length(3, 'All three languages required'),
  referenceSolution: z
    .array(
      z.object({
        language: z.enum(['C++', 'Java', 'JavaScript']),
        completeCode: z.string().min(1, 'Complete code is required')
      })
    )
    .length(3, 'All three languages required')
});

export default function AdminCreate() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      title: '',
      description: '',
      difficulty: 'easy',
      tags: [],
      visibleTestCases: [{ input: '', output: '', explanation: '' }],
      hiddenTestCases: [{ input: '', output: '' }],
      startCode: [
        { language: 'C++', initialCode: '' },
        { language: 'Java', initialCode: '' },
        { language: 'JavaScript', initialCode: '' }
      ],
      referenceSolution: [
        { language: 'C++', completeCode: '' },
        { language: 'Java', completeCode: '' },
        { language: 'JavaScript', completeCode: '' }
      ]
    }
  });

  const { fields: visibleFields, append: appendVisible, remove: removeVisible } = useFieldArray({
    control,
    name: 'visibleTestCases'
  });

  const { fields: hiddenFields, append: appendHidden, remove: removeHidden } = useFieldArray({
    control,
    name: 'hiddenTestCases'
  });

  const watchedTags = watch('tags') || [];

  // Convert comma-separated input into validated tag array
  const handleTagsChange = (e) => {
    const tagString = e.target.value || '';
    const tagsArray = tagString
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t !== '');

    // Filter to allowed tags only
    const validTags = tagsArray.filter((t) => ALLOWED_TAGS.includes(t));
    setValue('tags', validTags, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await axiosClient.post('/problem/create', data);
      // lightweight success toast
      alert('Problem created successfully!');
      navigate('/');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Utility: confirm removal
  const confirmAndRemove = (removeFn, index) => {
    if (window.confirm('Are you sure you want to remove this test case?')) {
      removeFn(index);
    }
  };

  return (
    <div
      className="min-h-screen text-white p-6 pt-17"
      style={{
        background: 'linear-gradient(160deg, #061021 0%, #071428 45%, #08122a 100%)'
      }}
    >
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Create New Problem</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info Card */}
            <div className="card bg-white/3 border border-white/6 shadow-lg p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    {...register('title')}
                    className={`input input-bordered bg-transparent text-white ${errors.title ? 'input-error' : ''}`}
                  />
                  {errors.title && <span className="text-error mt-1">{errors.title.message}</span>}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    {...register('description')}
                    className={`textarea textarea-bordered bg-transparent text-white h-32 ${errors.description ? 'textarea-error' : ''}`}
                  />
                  {errors.description && (
                    <span className="text-error mt-1">{errors.description.message}</span>
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="form-control w-1/2">
                    <label className="label">
                      <span className="label-text">Difficulty</span>
                    </label>
                    <select
                      {...register('difficulty')}
                      className={`select select-bordered bg-transparent ${errors.difficulty ? 'select-error' : ''}`}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                    {errors.difficulty && (
                      <span className="text-error mt-1">{errors.difficulty.message}</span>
                    )}
                  </div>

                  <div className="form-control w-1/2">
                    <label className="label">
                      <span className="label-text">Tags</span>
                    </label>
                    <input
                      type="text"
                      onChange={handleTagsChange}
                      placeholder="Comma separated tags (e.g., array, graph)"
                      className={`input input-bordered bg-transparent text-white`}
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      {watchedTags.length === 0 ? (
                        <span className="text-sm text-white/60">No tags selected</span>
                      ) : (
                        watchedTags.map((t, i) => (
                          <span key={i} className="badge badge-md bg-yellow-500 text-black">
                            {t}
                          </span>
                        ))
                      )}
                    </div>
                    {errors.tags && <span className="text-error mt-1">{errors.tags.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Test Cases Card */}
            <div className="card bg-white/3 border border-white/6 shadow-lg p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4">Test Cases</h2>

              {/* Visible */}
              <div className="mb-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Visible Test Cases</h3>
                  <button
                    type="button"
                    onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
                    className="btn btn-sm bg-yellow-500 text-black"
                  >
                    <Plus className="w-4 h-4 mr-2" />Add Visible Case
                  </button>
                </div>

                {visibleFields.map((field, index) => (
                  <div key={field.id} className="border p-4 rounded-lg space-y-2 bg-white/2">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => confirmAndRemove(removeVisible, index)}
                        className="btn btn-xs btn-ghost text-error"
                        aria-label="Remove visible test case"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <input
                      {...register(`visibleTestCases.${index}.input`)}
                      placeholder="Input"
                      className="input input-bordered w-full bg-transparent"
                    />
                    {errors.visibleTestCases?.[index]?.input && (
                      <span className="text-error">{errors.visibleTestCases[index].input.message}</span>
                    )}

                    <input
                      {...register(`visibleTestCases.${index}.output`)}
                      placeholder="Output"
                      className="input input-bordered w-full bg-transparent"
                    />
                    {errors.visibleTestCases?.[index]?.output && (
                      <span className="text-error">{errors.visibleTestCases[index].output.message}</span>
                    )}

                    <textarea
                      {...register(`visibleTestCases.${index}.explanation`)}
                      placeholder="Explanation"
                      className="textarea textarea-bordered w-full bg-transparent"
                    />
                    {errors.visibleTestCases?.[index]?.explanation && (
                      <span className="text-error">{errors.visibleTestCases[index].explanation.message}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Hidden */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Hidden Test Cases</h3>
                  <button
                    type="button"
                    onClick={() => appendHidden({ input: '', output: '' })}
                    className="btn btn-sm bg-yellow-500 text-black"
                  >
                    <Plus className="w-4 h-4 mr-2" />Add Hidden Case
                  </button>
                </div>

                {hiddenFields.map((field, index) => (
                  <div key={field.id} className="border p-4 rounded-lg space-y-2 bg-white/2">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => confirmAndRemove(removeHidden, index)}
                        className="btn btn-xs btn-ghost text-error"
                        aria-label="Remove hidden test case"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <input
                      {...register(`hiddenTestCases.${index}.input`)}
                      placeholder="Input"
                      className="input input-bordered w-full bg-transparent"
                    />
                    {errors.hiddenTestCases?.[index]?.input && (
                      <span className="text-error">{errors.hiddenTestCases[index].input.message}</span>
                    )}

                    <input
                      {...register(`hiddenTestCases.${index}.output`)}
                      placeholder="Output"
                      className="input input-bordered w-full bg-transparent"
                    />
                    {errors.hiddenTestCases?.[index]?.output && (
                      <span className="text-error">{errors.hiddenTestCases[index].output.message}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Code Templates Card */}
            <div className="card bg-white/3 border border-white/6 shadow-lg p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4">Code Templates</h2>

              <div className="space-y-6">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="font-medium">
                      {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
                    </h3>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Initial Code</span>
                      </label>
                      <pre className="bg-white/5 p-4 rounded-lg overflow-auto">
                        <textarea
                          {...register(`startCode.${index}.initialCode`)}
                          className="w-full bg-transparent font-mono text-sm"
                          rows={6}
                        />
                      </pre>
                      {errors.startCode?.[index]?.initialCode && (
                        <span className="text-error">{errors.startCode[index].initialCode.message}</span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Reference Solution</span>
                      </label>
                      <pre className="bg-white/5 p-4 rounded-lg overflow-auto">
                        <textarea
                          {...register(`referenceSolution.${index}.completeCode`)}
                          className="w-full bg-transparent font-mono text-sm"
                          rows={6}
                        />
                      </pre>
                      {errors.referenceSolution?.[index]?.completeCode && (
                        <span className="text-error">{errors.referenceSolution[index].completeCode.message}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn w-full bg-yellow-500 text-black" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Problem'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/*
Notes:
- If your backend accepts different tag spellings, update ALLOWED_TAGS accordingly.
- You can wire richer toasts instead of alert() and replace confirm() with a modal to match your design system.
- Requires: react-hook-form, zod, @hookform/resolvers, lucide-react, daisyUI + Tailwind.
*/
