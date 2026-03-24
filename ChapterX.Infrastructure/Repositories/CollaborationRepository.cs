using ChapterX.Domain.Entities;
using ChapterX.Domain.Repositories;
using ChapterX.Infrastructure.Data.DataContext;
using Microsoft.EntityFrameworkCore;

namespace ChapterX.Infrastructure.Repositories
{
    public class CollaborationRepository : GenericRepository<Collaboration>, ICollaborationRepository
    {
        public CollaborationRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Collaboration>> GetAllAsync(CancellationToken cancellationToken = default)
            => await _dbSet
                .Include(c => c.User)
                .ToListAsync(cancellationToken);

        public async Task<bool> DeleteByUserAndStoryAsync(int userId, int storyId, CancellationToken cancellationToken = default)
        {
            var collab = await _dbSet.FirstOrDefaultAsync(c => c.UserId == userId && c.StoryId == storyId, cancellationToken);
            if (collab == null) return false;
            _dbSet.Remove(collab);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
