using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.RegularUser.Commands
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, DeleteResponse>
    {
        private readonly IRegularUserRepository _regularUserRepository;
        private readonly ILogger<DeleteHandler> _logger;

        public DeleteHandler(IRegularUserRepository regularUserRepository, ILogger<DeleteHandler> logger)
        {
            _regularUserRepository = regularUserRepository;
            _logger = logger;
        }

        public async Task<DeleteResponse> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var regularUser = await _regularUserRepository.GetByIdAsync(request.Id, cancellationToken);
            if (regularUser is null)
                return new DeleteResponse(false);

            await _regularUserRepository.DeleteAsync(regularUser, cancellationToken);

            return new DeleteResponse(true);
        }
    }
}
