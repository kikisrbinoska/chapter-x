using ChapterX.Domain.Entities;
using ChapterX.Domain.Repositories;
using ChapterX.Infrastructure.Data.DataContext;
using Microsoft.EntityFrameworkCore;

namespace ChapterX.Infrastructure.Repositories
{
    public class LikesRepository : GenericRepository<Likes>, ILikesRepository
    {
        public LikesRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Likes>> GetByStoryIdAsync(int storyId, CancellationToken cancellationToken = default)
            => await _dbSet.Where(l => l.StoryId == storyId).ToListAsync(cancellationToken);

        public async Task<bool> ExistsAsync(int userId, int storyId, CancellationToken cancellationToken = default)
            => await _dbSet.AnyAsync(l => l.UserId == userId && l.StoryId == storyId, cancellationToken);

        public async Task<bool> DeleteByUserAndStoryAsync(int userId, int storyId, CancellationToken cancellationToken = default)
        {
            var like = await _dbSet.FirstOrDefaultAsync(l => l.UserId == userId && l.StoryId == storyId, cancellationToken);
            if (like == null) return false;
            _dbSet.Remove(like);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
