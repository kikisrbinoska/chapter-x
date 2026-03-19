using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.PermissionLevel.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly IPermissionLevelRepository _permissionLevelRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(IPermissionLevelRepository permissionLevelRepository, ILogger<GetAllHandler> logger)
        {
            _permissionLevelRepository = permissionLevelRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var permissionLevels = await _permissionLevelRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(permissionLevels);
        }
    }
}
