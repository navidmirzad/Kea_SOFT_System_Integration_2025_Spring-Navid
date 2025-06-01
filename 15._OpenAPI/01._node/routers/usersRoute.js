import { Router } from "express";

const router = Router();

let nextId = 4;
const users = [
  { id: 1, name: "Arne" },
  { id: 2, name: "Minho" },
  { id: 3, name: "Charlie" },
];

/**
 * @openapi
 * /api/users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Returns all users
 */
router.get("/api/users", (req, res) => {
  res.send({ data: users });
});

/**
 * @openapi
 * /api/users:
 *   post:
 *     description: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the user that was created
 */
router.post("/api/users", (req, res) => {
  const newUser = {
    id: nextId++,
    name: req.body.name,
  };
  users.push(newUser);
  res.send({ data: newUser });
});

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     description: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the ID of the deleted user
 */
router.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).send({ error: "User not found" });
  }

  users.splice(userIndex, 1);
  res.send({ data: { id } });
});

export default router;
