import Review from "@/interfaces/Review";

export default function MovieReviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Reviews</h2>
      {reviews && reviews.length > 0 ? (
        <ul className="space-y-2">
          {reviews.map((review) => (
            <li key={review.id} className="border rounded p-2">
              <div className="font-semibold">{review.reviewerName}</div>
              <div>{review.reviewText}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}