using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.RegularUser.Commands
{
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly IRegularUserRepository _regularUserRepository;
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(IRegularUserRepository regularUserRepository, ILogger<UpdateHandler> logger)
        {
            _regularUserRepository = regularUserRepository;
            _logger = logger;
        }

        public async Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            var regularUser = await _regularUserRepository.GetByIdAsync(request.Id, cancellationToken);
            if (regularUser is null)
                return new UpdateResponse(false);

            regularUser.Id = request.UserId;

            await _regularUserRepository.UpdateAsync(regularUser, cancellationToken);

            return new UpdateResponse(true);
        }
    }
}
