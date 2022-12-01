```js
const query = db.ride.find({ 'comments.1': { $exists: true } });

for await (const ride of query) {
    const filter = { _id: { $in: ride.comments } };
    const patch = { ride: ride.id };
    await db.rideComment.updateMany(filter, patch);
}
```
